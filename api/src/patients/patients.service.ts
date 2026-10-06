import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Patient } from './patient.entity';

import { CreatePatientDto } from './dto/create-patient.dto';

import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
  ) {}

  findAll() {
    return this.repo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const patient = await this.repo.findOneBy({
      id,
    });

    if (!patient) {
      throw new NotFoundException(
        `Paciente ${id} não encontrado`,
      );
    }

    return patient;
  }

  create(dto: CreatePatientDto) {
    const patient = this.repo.create(dto);

    return this.repo.save(patient);
  }

  async update(
    id: number,
    dto: UpdatePatientDto,
  ) {
    const patient = await this.findOne(id);

    Object.assign(patient, dto);

    return this.repo.save(patient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);

    await this.repo.remove(patient);

    return {
      mensagem: `Paciente ${id} removido`,
    };
  }
}
