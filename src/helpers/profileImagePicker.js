import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

async function requestMediaLibraryPermissions() {
  try {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  } catch (error) {
    console.log("REQUEST PERMISSIONS MEDIA LAB ERROR = ", error);
  }
}

export async function pickImage(setProfileImageURI) {
  try {
    await requestMediaLibraryPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      let filename = result.uri.split("/").pop();
      const newPath = FileSystem.documentDirectory + filename;
      await FileSystem.moveAsync({
        from: result.uri,
        to: newPath,
      });

      setProfileImageURI(newPath);
    } else return;
  } catch (error) {
    console.log("PICK IMAGE FUNC ERROR = ", error);
  }
}
