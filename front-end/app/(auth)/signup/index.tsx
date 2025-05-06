import Layout from "@/components/ui/Layout";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Button from "@/components/Button";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import DatePickerModal from "./DatePickerModal";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    password: "",
    passwordConfirm: "",
    birth: new Date(),
    phoneNumber: "",
    nickName: "",
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNicknameCheck = () => {
    console.log("nickname check");
  };

  const handleSignup = async () => {
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) return;

    if (formData.password !== formData.passwordConfirm) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.nickName.length > 8) {
      Alert.alert("닉네임은 8자 이하로 입력해주세요.");
      return;
    }

    if (formData.phoneNumber.length !== 11) {
      Alert.alert("연락처는 11자리로 입력해주세요.");
      return;
    }

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          account: formData.account,
          password: formData.password,
          birth: formData.birth,
          phoneNumber: formData.phoneNumber,
          nickName: formData.nickName,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      Alert.alert(data.error || data.message || "회원가입에 실패했습니다.");
      return;
    }

    Alert.alert(data.message);
    router.replace("/(auth)");
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ padding: 20 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // 필요시 조절
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>이름</Text>
              <TextInput
                style={styles.input}
                placeholder="이름"
                placeholderTextColor="#666"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>아이디</Text>
              <TextInput
                style={styles.input}
                placeholder="아이디"
                placeholderTextColor="#666"
                value={formData.account}
                onChangeText={(text) =>
                  setFormData({ ...formData, account: text })
                }
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#666"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>비밀번호 재입력</Text>
              <TextInput
                style={[
                  styles.input,
                  formData.password !== formData.passwordConfirm &&
                    styles.errorInput,
                ]}
                placeholder="비밀번호"
                placeholderTextColor="#666"
                secureTextEntry
                value={formData.passwordConfirm}
                onChangeText={(text) =>
                  setFormData({ ...formData, passwordConfirm: text })
                }
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>생년월일</Text>
              <Pressable
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{date.toISOString().split("T")[0]}</Text>
              </Pressable>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>연락처</Text>
              <TextInput
                style={styles.input}
                placeholder="연락처"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={formData.phoneNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, phoneNumber: text })
                }
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>닉네임</Text>
              <View
                style={{ gap: 5, flexDirection: "row", alignItems: "center" }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="8자 이하로 입력"
                  placeholderTextColor="#666"
                  value={formData.nickName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, nickName: text })
                  }
                />
                <Button text="중복확인" onPress={handleNicknameCheck} />
              </View>
              <Button text="회원가입" onPress={handleSignup} />
            </View>
          </View>

          <DatePickerModal
            isOpen={showDatePicker}
            setIsOpen={setShowDatePicker}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 10 }}
            >
              생년월일
            </Text>
            <DateTimePicker
              value={date}
              onChange={(event, selectedDate) => {
                setDate(selectedDate || date);
              }}
              display="spinner"
              dateFormat="dayofweek day month"
            />
            <Button
              text="확인"
              width="100%"
              onPress={() => setShowDatePicker(false)}
            />
          </DatePickerModal>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 10,
    paddingBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
  },
  signup: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default SignupPage;
