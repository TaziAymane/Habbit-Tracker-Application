import { DATABASE_ID, databases, HABITS_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, TextInput, useTheme , Text } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "mounthly"];
type Frequency = (typeof FREQUENCIES)[number];
export default function AddHabitScreen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error , setError] = useState<string>("");
  const theme = useTheme()
  const { user } = useAuth();
  const router = useRouter();
  const handelSubmit = async () => {
    if (!user) return;

    try {
      await databases.createDocument(DATABASE_ID, HABITS_ID, ID.unique(), {
        title,
        description,
        frequency,
        steak_count: 0,
        last_completed: new Date().toISOString(),
      });

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        return;
      }

      setError('Ther was error in creating the habit !!!!')
    }
  };
  return (
    <View style={style.container}>
      <TextInput
        label="Title"
        mode="outlined"
        style={style.input}
        onChangeText={setTitle}
      />
      <TextInput
        label="Descrition"
        mode="outlined"
        style={style.input}
        onChangeText={setDescription}
      />
      <View style={style.frequenciesContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      <Button
        mode="contained"
        onPress={handelSubmit}
        disabled={!title || !description}
      >
        Add Habit
      </Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  frequenciesContainer: {
    marginBottom: 25,
  },
});
