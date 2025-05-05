import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Layout from "@/components/ui/Layout";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import BottomSheet from "./BottomSheet";
import { useCartStore } from "@/store/useCartStore";
import { router } from "expo-router";

const CouponBottomSheet = BottomSheet;

const OrderPage = () => {
  const { cart, clearCart } = useCartStore();
  const [isOpenOrderProducts, setIsOpenOrderProducts] = useState(false);
  const [isOpenOrderNotice, setIsOpenOrderNotice] = useState(false);
  const [storeRequest, setStoreRequest] = useState("");
  const [isTakeout, setIsTakeout] = useState(true);
  const [packageOption, setPackageOption] = useState<string[]>([]);
  const [isOpenCouponModal, setIsOpenCouponModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("메가선불카드");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.perTotalPrice * item.quantity,
    0
  );

  const handlePay = async () => {
    console.log("storeRequest", storeRequest);
    console.log("isTakeout", isTakeout);
    console.log("packageOption", packageOption);
    console.log("paymentMethod", paymentMethod);
    console.log("cart", JSON.stringify(cart, null, 2));

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/123`,
      {
        method: "POST",
        body: JSON.stringify({
          discount_price: 0,
          is_take_out: isTakeout,
          item_make_time: 5,
          member_id: 123,
          nickname: "test",
          order_count: 1,
          order_date: new Date(),
          package_option: packageOption,
          payment_method: paymentMethod,
          request_message: storeRequest,
          store_name: cart[0].store,
          total_price: totalPrice,
        }),
      }
    );
    const data = await response.json();
    console.log("success", data.success);
    console.log("message", data.message);
    console.log("orderNumber", data.orderNumber);
    // clearCart();
    // router.push("/(order)/list/123");
  };

  return (
    <Layout>
      <ScrollView bounces={false}>
        <View style={styles.store}>
          <Text style={{ color: "white", fontSize: 20 }}>중구중림점</Text>
        </View>

        <Accordion
          isOpen={isOpenOrderProducts}
          setIsOpen={setIsOpenOrderProducts}
          title="주문 상품"
        >
          <View style={styles.orderProducts}>
            {cart.map((item, idx) => (
              <View
                key={`${item.id.toString()}-${JSON.stringify(item.options)}-${
                  item.quantity
                }-${item.isUseTumbler}`}
                style={styles.cartListCard}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cartListImage}
                />
                <View style={styles.cartListCardInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <View style={{ gap: 5 }}>
                    {item.isUseTumbler && <Text>텀블러(개인컵) 사용</Text>}
                    {item.selectedShot !== null && (
                      <Text>{item.selectedShot}</Text>
                    )}
                    {Object.entries(item.options)
                      .filter(([_, value]) => value === true)
                      .map(([key]) => (
                        <Text key={key}>{key}</Text>
                      ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Accordion>

        <View style={{ gap: 20, padding: 20 }}>
          <View style={{ gap: 10 }}>
            <Text style={styles.title}>요청사항</Text>
            <Text style={styles.subtitle}>매장 요청사항</Text>
            <TextInput
              style={styles.input}
              placeholder="매장 요청사항이 있으면 적어주세요."
              onChangeText={setStoreRequest}
              value={storeRequest}
            />
          </View>

          <View style={{ gap: 10 }}>
            <Text style={styles.subtitle}>포장 요청사항</Text>
            <Checkbox
              isChecked={isTakeout}
              setIsChecked={setIsTakeout}
              label="포장해주세요."
            />
            <Checkbox
              isChecked={!isTakeout}
              setIsChecked={() => setIsTakeout(!isTakeout)}
              label="매장에서 먹고 갈게요."
            />
          </View>

          {isTakeout && (
            <View style={{ gap: 10 }}>
              <Text style={styles.subtitle}>포장옵션</Text>
              <Checkbox
                isChecked={packageOption?.includes("Carrier")}
                setIsChecked={() =>
                  setPackageOption(
                    packageOption?.includes("Carrier")
                      ? packageOption?.filter((option) => option !== "Carrier")
                      : [...packageOption, "Carrier"]
                  )
                }
                label="캐리어/봉투 필요해요"
              />
              <Checkbox
                isChecked={packageOption?.includes("Straw")}
                setIsChecked={() =>
                  setPackageOption(
                    packageOption?.includes("Straw")
                      ? packageOption?.filter((option) => option !== "Straw")
                      : [...packageOption, "Straw"]
                  )
                }
                label="빨대/스틱 필요해요"
              />
            </View>
          )}
        </View>

        <View>
          <Text style={[styles.title, { paddingHorizontal: 20 }]}>
            쿠폰 적용
          </Text>
          <Pressable
            style={styles.couponContainer}
            onPress={() => setIsOpenCouponModal(true)}
          >
            <Text>쿠폰</Text>
            <Entypo name="chevron-thin-right" size={20} color="black" />
          </Pressable>
        </View>

        <View style={{ padding: 20, gap: 10 }}>
          <Text style={styles.title}>결제 수단</Text>
          <View style={{ gap: 10 }}>
            <Checkbox
              isChecked={paymentMethod === "메가선불카드"}
              setIsChecked={() => setPaymentMethod("메가선불카드")}
              label="메가선불카드"
            />
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 10 }}
            >
              <Checkbox
                isChecked={paymentMethod === "신용카드"}
                setIsChecked={() => setPaymentMethod("신용카드")}
                label="신용카드"
                style={{ width: "50%" }}
              />
              <Checkbox
                isChecked={paymentMethod === "간편카드 결제"}
                setIsChecked={() => setPaymentMethod("간편카드 결제")}
                label="간편카드 결제"
                style={{ width: "50%" }}
              />
              <Checkbox
                isChecked={paymentMethod === "토스페이"}
                setIsChecked={() => setPaymentMethod("토스페이")}
                label="토스페이"
                style={{ width: "50%" }}
              />
              <Checkbox
                isChecked={paymentMethod === "네이버페이"}
                setIsChecked={() => setPaymentMethod("네이버페이")}
                label="네이버페이"
                style={{ width: "50%" }}
              />
              <Checkbox
                isChecked={paymentMethod === "카카오페이"}
                setIsChecked={() => setPaymentMethod("카카오페이")}
                label="카카오페이"
                style={{ width: "50%" }}
              />
              <Checkbox
                isChecked={paymentMethod === "페이코"}
                setIsChecked={() => setPaymentMethod("페이코")}
                label="페이코"
                style={{ width: "50%" }}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 10 }}>
          <View style={styles.priceContainer}>
            <Text style={styles.subtitle}>상품금액</Text>
            <Text style={styles.price}>{totalPrice.toLocaleString()}원</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.subtitle}>할인금액</Text>
            <Text style={styles.price}>-{Number(0).toLocaleString()}원</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.subtitle}>결제금액</Text>
            <Text style={[styles.price, { color: "red", fontWeight: "bold" }]}>
              {totalPrice.toLocaleString()}원
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ borderBottomWidth: 0.2, width: "100%", height: 20 }} />
        </View>

        <Accordion
          isOpen={isOpenOrderNotice}
          setIsOpen={setIsOpenOrderNotice}
          title="메가오더 유의사항"
        >
          <View style={styles.orderNotice}>
            <Text>
              1. 메가오더 서비스는 각 매장의 영업시간에 한해서 사용 가능합니다.
            </Text>
            <Text>
              2. 결제 완료와 동시에 매장으로 주문내용이 전송되며, 매장에서
              제조리스트에 포함되기 때문에 고객 변심에 따른 주문 변경/취소가
              불가합니다.
            </Text>
            <Text>
              3. 일부 메뉴의 경우 매장 상황에 따라 주문이 불가능 할 수 있습니다.
            </Text>
            <Text>
              4. 주문 메뉴의 준비가 완료되었거나, 매장사정으로 주문이 취소되었을
              경우 안내를 위한 푸시 알림이 옵니다.
            </Text>
            <Text>
              5. 카드 결제의 승인 취소는 카드사 사정에 따라 2~3일 및 그 이상의
              시일이 소요될 수 있습니다.
            </Text>
            <Text>
              6. 스탬프는 매장의 주문 승인 후, 즉 결제완료 시 자동적립됩니다.
            </Text>
            <Text>
              7. 주문하신 메뉴를 수령하지 않은 경우, 메뉴는 제조 완료 후
              1시간까지 매장에서 보관 후 폐기됩니다.
            </Text>
            <Text>
              8. 매장의 메뉴 제조 완료 및 요청에도 불구하고회원이 메뉴를 수령한
              경우, 결제 취소 및 환불이 불가하고, 메뉴를 늦게 픽업하여 메뉴 수령
              당시 메뉴의 질이 떨어진 경우 메뉴 재 제조가 불가합니다.
            </Text>
          </View>
        </Accordion>

        <View style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
          <Button
            text="결제하기"
            onPress={handlePay}
            backgroundColor="#452613"
            color="white"
          />
        </View>
      </ScrollView>
      <CouponBottomSheet
        isOpen={isOpenCouponModal}
        setIsOpen={setIsOpenCouponModal}
      >
        <View>
          <Text style={styles.title}>쿠폰 적용</Text>
          <View style={{ flex: 1 }}></View>
          <View style={{}}>
            <Button
              text="취소"
              onPress={() => {
                setIsOpenCouponModal(false);
              }}
              backgroundColor="#e8e4e0"
              color="452613"
            />
            <Button
              text="저장"
              onPress={() => {
                setIsOpenCouponModal(false);
              }}
              backgroundColor="#452613"
              color="white"
            />
          </View>
        </View>
      </CouponBottomSheet>
    </Layout>
  );
};

const styles = StyleSheet.create({
  store: {
    backgroundColor: "black",
    padding: 20,
  },
  orderProducts: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "white",
  },
  orderNotice: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 5,
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 10,
    backgroundColor: "white",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartListCard: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  cartListImage: {
    width: 100,
    height: 100,
    borderRadius: "100%",
  },
  cartListCardInfo: {
    flex: 1,
    gap: 10,
  },
});

export default OrderPage;
