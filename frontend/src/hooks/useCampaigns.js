import { sampleCampaigns } from '../utils/sampleData'

export function useCampaigns() {
  return { campaigns: sampleCampaigns, isLoading: false }
}
