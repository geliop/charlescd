import { IsBooleanString, IsOptional, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class ExecutionQuery {
  @IsNumber()
  @IsOptional()
  @Transform(size => parseInt(size), { toClassOnly: true })
  public size: number

  @IsNumber()
  @IsOptional()
  @Transform(page => parseInt(page), { toClassOnly: true })
  public page: number

  @IsBooleanString()
  public active: boolean

  constructor(size: number, page: number, active: boolean) {
    this.size = size
    this.page = page
    this.active = active
  }
}
