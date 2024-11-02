import {defineDevConfig} from "@junobuild/config";

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      datastore: [
        {
          collection: "users",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        },
        {
          collection: "medicalHistories",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        },
        {
          collection: "userMedicalHistories",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        },
        {
          collection: "outlets",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        },
        {
          collection: "subscriptions",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        },
        {
          collection: "userSubscriptions",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        }
      ],
      storage: [
        {
          collection: "images",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        }
      ]
    }
  }
}));
