package com.megacoffee.kiosk.itempicture.domain;

import com.megacoffee.kiosk.item.domain.Item;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item_picture")
@Getter
@Setter
@NoArgsConstructor
public class ItemPicture {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemPictureId;
    
    @Column(length = 500)
    private String itemPictureUrl;  // S3 URL의 도메인을 제외한 경로만 저장 (예: images/coffee.jpg)
    
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
}
