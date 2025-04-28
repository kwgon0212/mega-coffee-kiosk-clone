import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SearchButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="search" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SearchButton;
