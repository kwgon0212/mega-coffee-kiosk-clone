package com.megacoffee.kiosk.order.domain;

public enum OrderStatus {
    CONFIRMED, // 주문 확인
    COMPLETED, // 주문 완료
    PREPARING, // 주문 제작 중
    PAYMENT_DONE, // 결제 완료
}
