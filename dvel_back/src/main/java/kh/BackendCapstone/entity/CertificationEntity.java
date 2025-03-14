package kh.BackendCapstone.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name ="certification")
@Table(name="certification")

public class CertificationEntity {
    @Id
    private String userId;
    private String email;
    private String certification;
}
