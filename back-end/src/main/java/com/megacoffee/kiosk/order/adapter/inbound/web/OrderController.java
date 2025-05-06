package com.megacoffee.kiosk.order.adapter.inbound.web;

import com.megacoffee.kiosk.global.response.SuccessResponse;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderRequestDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.StatusRequestDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.response.OrderCreateResponseDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.response.AllOrderResponseDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.response.SingleOrderResponseDto;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.application.port.inbound.CreateOrderUseCase;
import com.megacoffee.kiosk.order.application.port.inbound.FindOrderUseCase;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@Tag(name = "Order API", description = "주문 관련 API")
@RequestMapping("/api/orders")

public class OrderController {

    private final CreateOrderUseCase createOrderUseCase;
    private final FindOrderUseCase findOrderUseCase;
    //== 주문 생성 ==//
    @Operation(summary = "주문 생성" , description = "주문을 생성합니다.",
    responses = @ApiResponse(
            content = @Content(schema = @Schema(oneOf = {OrderCreateResponseDto.class}) , mediaType = "application/json")
    ))

    @PostMapping("/{userId}")
    public ResponseEntity<?> createOrder(@PathVariable UUID userId , @RequestBody OrderRequestDto orderRequestDto) {
        // 주문 생성
        Order order = createOrderUseCase.createOrder(userId,orderRequestDto);

        // 주문 생성 성공 응답
        return ResponseEntity.ok(SuccessResponse.success("주문이 완료되었습니다", OrderCreateResponseDto.from(order)));
    }
    //== 주문 조회 ==//
    @Operation(summary = "모든 유저 주문 조회", description = "모든 유저의 주문 내역을 조회합니다.")
    @ApiResponses(
            @ApiResponse(content = @Content(array = @ArraySchema(schema = @Schema(implementation = AllOrderResponseDto.class))))
    )
    @GetMapping("/admin")
    public ResponseEntity<?> findAllOrders() {
        // 모든 유저의 주문 조회
        List<OrderEntity> allOrders = findOrderUseCase.findAllOrders();
        List<AllOrderResponseDto> allOrderResponseDtos = allOrders.stream()
                .map(AllOrderResponseDto::from)
                .toList();
        // 주문 조회 성공 응답
        return ResponseEntity.ok(SuccessResponse.success("모든 유저의 주문 내역 조회에 성공하였습니다", allOrderResponseDtos));
    }

    @Operation(summary = "주문 조회" , description = "사용자의 주문 내역을 모두 조회합니다.")
    @ApiResponses(
            @ApiResponse(content = @Content(array = @ArraySchema(schema = @Schema(implementation = AllOrderResponseDto.class))))
    )
    @GetMapping("/{userId}")
    public ResponseEntity<?> findOrder(@PathVariable UUID userId) {
        // 주문 조회
        List<OrderEntity> allOrders = findOrderUseCase.findAllOrders(userId);
        List<AllOrderResponseDto> allOrderResponseDtos = allOrders.stream()
                .map(AllOrderResponseDto::from)
                .toList();
        // 주문 조회 성공 응답
        return ResponseEntity.ok(SuccessResponse.success("주문 내역 조회에 성공하였습니다", allOrderResponseDtos));
    }

    //== 주문 번호로 주문 조회 ==//
    @Operation(summary = "주문 번호로 주문 조회" , description = "주문 번호로 주문을 조회합니다.")
    @ApiResponse(
            content = @Content(schema = @Schema(implementation = AllOrderResponseDto.class) , mediaType = "application/json")
    )
    @GetMapping("/{userId}/{orderId}")
    public ResponseEntity<?> findOrderByOrderId(@PathVariable UUID userId, @PathVariable UUID orderId) {
        // 주문 번호로 주문 조회
        OrderEntity order = findOrderUseCase.findOrderById(orderId);
        SingleOrderResponseDto singleOrderResponseDto = SingleOrderResponseDto.from(order);
        // 주문 조회 성공 응답
        return ResponseEntity.ok(SuccessResponse.success("주문 상세 조회에 성공하였습니다", singleOrderResponseDto));
    }

    //== 특정 주문 상태 업데이트 ==//
    @Operation(summary = "주문 상태 업데이트" , description = "관리자가 주문 상태를 업데이트합니다.")
    @PutMapping("/admin/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable UUID orderId, @RequestBody StatusRequestDto statusRequestDto) {
        System.out.println("OrderController.updateOrderStatus");
        // 주문 상태 업데이트
        System.out.println("statusRequestDto = " + statusRequestDto.getOrderStatus());
        createOrderUseCase.changeOrderStatus(orderId, statusRequestDto.getOrderStatus());

        // 주문 상태 업데이트 성공 응답
        return ResponseEntity.ok(SuccessResponse.success("주문 상태 업데이트에 성공하였습니다", null));
    }



}
