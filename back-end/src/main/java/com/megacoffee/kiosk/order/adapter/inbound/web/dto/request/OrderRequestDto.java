package com.megacoffee.kiosk.order.adapter.inbound.web.dto.request;

import com.megacoffee.kiosk.order.domain.PackageOption;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 메뉴에서 주문 옵션 추출")
public class OrderRequestDto {
    private List<OrderMenuRequestDto> items;
    private String storeName;
    private String requestMessage;
    private boolean takeOut;
    private PackageOption packageOption;
    private Integer discountPrice;
    private String paymentMethod;
    private String nickName;
    private Integer itemMakeTime;
}
