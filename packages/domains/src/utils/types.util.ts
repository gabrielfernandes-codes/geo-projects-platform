export type Override<OriginalType, AdditionalFields = {}, OmitFields extends keyof OriginalType = never> = Omit<
  OriginalType,
  keyof AdditionalFields | OmitFields
> &
  AdditionalFields
