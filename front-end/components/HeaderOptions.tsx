import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Option {
  id: string;
  label: string;
}

interface HeaderOptionsProps {
  options: Option[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const HeaderOptions = ({
  options,
  selectedOption,
  onSelect,
}: HeaderOptionsProps) => {
  return (
    <View style={{ width: "100%" }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContent}
        contentContainerStyle={{ gap: 10 }}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.headerOption}
            onPress={() => onSelect(option.id)}
          >
            <Text
              style={[
                styles.headerOptionText,
                {
                  fontWeight: selectedOption === option.id ? "bold" : "normal",
                },
              ]}
            >
              {option.label}
            </Text>
            <View
              style={selectedOption === option.id ? styles.selected : null}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  headerOption: {
    flex: 1,
    gap: 10,
    alignItems: "center",
  },
  headerOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  selected: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    borderRadius: 999,
  },
});

export default HeaderOptions;
