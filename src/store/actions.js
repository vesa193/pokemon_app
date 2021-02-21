import { IS_LOADER_ACTIVE } from "./consts"

export const loader = (isLoading) => {
  return {
    type: IS_LOADER_ACTIVE,
    isLoading
  }
}