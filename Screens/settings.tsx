import { ScrollView, View, Text, Switch, TouchableOpacity, Modal, Pressable, GestureResponderEvent } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAccessFramework, readAsStringAsync, writeAsStringAsync } from 'expo-file-system';
import { getDocumentAsync } from 'expo-document-picker';

/* Components */
import ColorPickerComponent from "../components/colorpicker";
import SquareColor from "../components/squarecolor";

/* Types */
import { Database } from "expo-sqlite";
import { ArrayDB, BackgroundColors, DEFAULT_COLORS } from "../utils/types";

/* Styles */
import styles from '../StyleSheets/settings'
import containers from "../StyleSheets/containers";

/* Icons */
import ArrowRight from "../assets/svg/arrowright";


type Props = {
  workoutsDB: Database;
  setWorkouts: Function;
}

export default function Settings({ workoutsDB, setWorkouts }: Props) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [defaultBackgroundColor, setDefaultBackgroundColor] = useState<string>("");
  const [editing, setEditing] = useState<string>("");

  const [volume, setVolume] = useState<boolean>(true);
  const [backgroundColors, setBackgroundColors] = useState<BackgroundColors>(DEFAULT_COLORS);

  useEffect(() => {
    const retrieveSettings = async () => {
      try {
        const savedVolume = await AsyncStorage.getItem('volume');
        const savedBgColors = await AsyncStorage.getItem('bgColors');

        if (savedVolume !== null) {
          setVolume(JSON.parse(savedVolume));
        }
        if (savedBgColors !== null) {
          setBackgroundColors(JSON.parse(savedBgColors));
        }
      } catch (error) {
        console.log('Error retrieving settings:', error);
      }
    };

    retrieveSettings();
  }, []);

  const saveFile = async (data: ArrayDB) => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      // Get the directory uri that was approved
      let directoryUri = permissions.directoryUri;
      // Create file and pass it's SAF URI
      await StorageAccessFramework.createFileAsync(directoryUri, "workoutsexport", "application/json").then(async (fileUri) => {
        // Save data to newly created file
        await writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: "utf8" });
      }).catch(error => {
        console.log(error);
      });
    } else {
      alert("You must allow permission to save.")
    }
  }

  const toggleSwitch = async (setting: string) => {
    switch (setting) {
      case 'volume':
        const newVolume = !volume;
        setVolume(newVolume);
        await AsyncStorage.setItem('volume', JSON.stringify(newVolume));
        break;
    }
  };

  const importTrainings = async () => {
    try {
      const result = await getDocumentAsync({ type: 'application/json', copyToCacheDirectory: false });
      if (result.type === 'success') {
        const content = await readAsStringAsync(result.uri);
        try {
          const newWorkouts: ArrayDB = JSON.parse(content);
          workoutsDB.transaction(tx => {
            tx.executeSql(`
              CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                prepTime INTEGER,
                activeTime INTEGER,
                restTime INTEGER,
                restBetweenSets INTEGER,
                series INTEGER,
                sets INTEGER
              )
            `);
          });

          newWorkouts.forEach(newWorkout => {
            workoutsDB.transaction(tx => {
              tx.executeSql(`
                  INSERT INTO workouts (name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES (?, ?, ?, ?, ?, ?, ?)
              `, [newWorkout.name, newWorkout.prepTime, newWorkout.activeTime, newWorkout.restTime, newWorkout.restBetweenSets, newWorkout.series, newWorkout.sets],
                (txObj, resultSet) => {
                  setWorkouts((prev: any) => [...prev, {
                    id: resultSet.insertId,
                    name: newWorkout.name,
                    prepTime: newWorkout.prepTime,
                    activeTime: newWorkout.activeTime,
                    restTime: newWorkout.restTime,
                    restBetweenSets: newWorkout.restBetweenSets,
                    series: newWorkout.series,
                    sets: newWorkout.sets
                  }])
                },
                (txObj, error) => { console.log(error); return false }
              );
            });
          })
        } catch (err) {
          alert("File must be a valid json")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const exportTrainings = () => {
    workoutsDB.transaction(tx => {
      tx.executeSql('SELECT * FROM workouts', [],
        (txObj, resultSet) => {
          if (resultSet.rows._array.length === 0) {
            alert("No workouts to export")
          } else {
            saveFile(resultSet.rows._array);
          }
        },
        (txObj, error) => { console.log(error); return false }
      );
    });
  }

  const dropTrainings = () => {
    workoutsDB.transaction((tx: any) => {
      tx.executeSql(`
        DELETE FROM workouts
      `);
    });
    setWorkouts([]);
  }

  const dropSettings = async () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys));
    setVolume(true);
    setBackgroundColors(DEFAULT_COLORS);
  }

  const SubBox = ({ text, color, onPress }: { text: string, color: string, onPress: () => void }) => (
    <View style={styles.subbox}>
      <Text style={styles.setting}>{text}</Text>
      <Pressable onPress={onPress} style={styles.setCX}>
        <SquareColor color={color} />
        <Text style={styles.color}>{color}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={containers.main}>

      <Modal
        animationType="none"
        transparent={true}
        visible={showPicker}
        onRequestClose={() => {
          setShowPicker(false)
        }}
      >
        <ColorPickerComponent
          setShowPicker={setShowPicker}
          defaultColor={defaultBackgroundColor}
          editing={editing}
          setBackgroundColors={setBackgroundColors}
        />
      </Modal>

      <ScrollView>
        <View style={styles.boxes}>

          {/******************************************************************/}

          <View style={styles.header}>
            <Text style={styles.headertext}>Preferencias</Text>
          </View>

          <View style={styles.box}>
            <View style={styles.subbox}>
              <Text style={styles.setting}>Volumen</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#e47474' }}
                thumbColor={volume ? '#ef4234' : '#f4f3f4'}
                onValueChange={() => toggleSwitch('volume')}
                value={volume}
              />
            </View>
          </View>

          {/******************************************************************/}

          <View style={styles.header}>
            <Text style={styles.headertext}>Color del fondo</Text>
          </View>

          <View style={styles.box}>
            <SubBox
              text="Preparación"
              color={backgroundColors.prepTime}
              onPress={() => {
                setEditing('prepTime')
                setDefaultBackgroundColor(backgroundColors.prepTime);
                setShowPicker(true);
              }}
            />

            <View style={styles.separator}></View>

            <SubBox
              text="Ejercitar"
              color={backgroundColors.activeTime}
              onPress={() => {
                setEditing('activeTime')
                setDefaultBackgroundColor(backgroundColors.activeTime);
                setShowPicker(true);
              }}
            />

            <View style={styles.separator}></View>

            <SubBox
              text="Descanso"
              color={backgroundColors.restTime}
              onPress={() => {
                setEditing('restTime')
                setDefaultBackgroundColor(backgroundColors.restTime);
                setShowPicker(true);
              }}
            />
          </View>

          {/******************************************************************/}

          <View style={styles.header}>
            <Text style={styles.headertext}>Zona sensible</Text>
          </View>

          <View style={styles.dangerbox}>
            <View style={styles.subbox}>
              <Text style={styles.setting}>Importar entrenamientos</Text>
              <TouchableOpacity onPress={importTrainings}>
                <ArrowRight color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.subbox}>
              <Text style={styles.setting}>Exportar entrenamientos</Text>
              <TouchableOpacity onPress={exportTrainings}>
                <ArrowRight color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.subbox}>
              <Text style={styles.setting}>Eliminar entrenamientos</Text>
              <TouchableOpacity onPress={dropTrainings}>
                <ArrowRight color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.subbox}>
              <Text style={styles.setting}>Restablecer ajustes</Text>
              <TouchableOpacity onPress={dropSettings}>
                <ArrowRight color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}