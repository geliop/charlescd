/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  BadRequestException, ConflictException, ExecutionContext, Header,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import { CreateCdConfigurationDto } from '../dto'
import { CdTypeEnum } from '../enums'
import {
  validate,
  ValidationError
} from 'class-validator'
import { OctopipeConfigurationData } from '../interfaces'
import { CdConfigurationsRepository } from '../repository'

@Injectable()
export class UniqueNamespaceByWorskpacePipe implements PipeTransform {
  constructor(private readonly cdConfigurationsRepository: CdConfigurationsRepository) {

  }

  public async transform(createCdConfigurationDto: CreateCdConfigurationDto): Promise<CreateCdConfigurationDto> {
    const cdConfiguration = await this.cdConfigurationsRepository.findOne(
      { where : {
        namespace : createCdConfigurationDto.configurationData.namespace }
      }
    )
    if (cdConfiguration) {
      throw new ConflictException('Namespace already registered')
    }
    return createCdConfigurationDto
  }


}