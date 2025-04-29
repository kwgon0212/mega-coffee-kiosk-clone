package com.megacoffee.kiosk.order.domain;

public enum OrderStatus {
    PENDING, // 주문 대기
    IN_PROGRESS, // 주문 진행 중
    COMPLETED, // 주문 완료
    CANCELLED // 주문 취소
}
