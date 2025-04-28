import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SearchButton = ({
  onPress,
  color,
}: {
  onPress: () => void;
  color?: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="search" size={24} color={color} />
    </TouchableOpacity>
  );
};

export default SearchButton;
