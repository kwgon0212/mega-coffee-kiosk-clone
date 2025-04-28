import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const CartButton = ({
  onPress,
  color = "black",
}: {
  onPress: () => void;
  color?: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="shopping-cart" size={24} color={color} />
    </TouchableOpacity>
  );
};

export default CartButton;
