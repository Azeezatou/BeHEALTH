export function useDonation() {
  return {
    initiateDonation: async () => ({ message: 'Donation integration is ready for the backend API.' }),
    isLoading: false,
  }
}
