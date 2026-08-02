export const requestConfig = {
  maxActiveRequestsPerUser: 3,
  maxConversationsPerRequest: 3,
  initialInvitationBatchSize: 5,
  nextInvitationBatchSize: 5,
  invitationBatchIntervalHours: 3,
  maxInvitationsPerRequest: 25,
  requestExpirationHours: 72,
  requesterConfirmationRequired: false,
  firstMessageRequiredToCreateConversation: true,
  pauseEnabled: true,
  editEnabled: true,
  reopenEnabled: true,
} as const;
