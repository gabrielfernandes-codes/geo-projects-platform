export type Override<OriginalType, AdditionalFields = {}, OmitFields extends keyof OriginalType = never> = Omit<
  OriginalType,
  keyof AdditionalFields | OmitFields
> &
  AdditionalFields

export type ArrayItem<T> = T extends Array<infer U> ? U : never
