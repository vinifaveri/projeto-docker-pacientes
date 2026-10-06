import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  full_name: string;

  @Column({ length: 30, unique: true })
  document: string;

  @Column({ length: 5 })
  blood_type: string;

  @Column({ type: 'text', nullable: true })
  allergies: string;
}
