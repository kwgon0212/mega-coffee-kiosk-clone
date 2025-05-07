package com.megacoffee.kiosk.store.inbound;

import com.megacoffee.kiosk.global.response.SuccessResponse;
import com.megacoffee.kiosk.store.application.StoreRepository;
import com.megacoffee.kiosk.store.domain.Store;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class StoreController {

    private final StoreRepository storeRepository;

    @Operation(summary = "매장 조회", description = "매장를 조회합니다.")
    @GetMapping("/api/stores")
    public ResponseEntity<?> getStores() {
        List<Store> stores = storeRepository.findAll();
        return ResponseEntity.ok(SuccessResponse.success("success", stores));
    }

    @Operation(summary = "매장 생성", description = "매장을 생성합니다.")
    @PostMapping("/api/store")
    public ResponseEntity<?> createStore(@RequestBody Store store) {
        log.info("store controller");
        Store savedStore = storeRepository.save(store);
        return ResponseEntity.ok(SuccessResponse.success("success", savedStore));
    }

    @DeleteMapping("/api/store/{id}")
    public void deleteStore(@PathVariable Long id) {
        Store store = storeRepository.findById(id);
        if (store != null) {
            storeRepository.delete(store);
        }
    }
}
