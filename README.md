# DiscordClone App

Demo - [discordClone.uk](https://discordclone.uk/)

## Introduction
The Discord Clone project aims to replicate the functionality of the popular communication platform Discord. It allows users to create servers, channels, engage in text and voice chats, make video calls, and manage roles. 

## Features
- User authentication and authorization
- Creation and management of servers and channels
- Real-time text messaging with the ability to edit and delete messages
- Voice and video calls
- Member role management

## Tech Stack

- **Next.js 14**: Powering the frontend and server-side rendering.
- **Form Validation**: Implemented using Zod and React Hook Form.
- **Toasts**: Utilizing React Toast for feedback messages.
- **Authentication**: Managed by Clerk, supporting Google and GitHub OAuth.
- **Components**: Shadcn
- **Database**: MySQL from Aiven 
- **Upload Management**: Handled by uploadThing.
- **Data Fetching** - React Query
- **CSS**: Styled with Tailwind CSS.
- **Icons**: Leveraging Lucide React.
- **Database ORM**: Prisma for database operations.
- **State Management**: Utilizing Zustand for state management.

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository: `https://github.com/yashUcr773/discord.git`.
2. Navigate to the project directory: `cd discord`.
3. Install dependencies: `npm install`.
4. Run the development server: `npm run dev`.
5. The application will be accessible at `http://localhost:3000` by default.

## Environment Variables

The Discord Clone application relies on the following environment variables. Ensure these variables are properly set up before running the application.

- **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`**: Public key provided by Clerk for client-side authentication.
- **`CLERK_SECRET_KEY`**: Secret key provided by Clerk for server-side authentication.
- **`NEXT_PUBLIC_CLERK_SIGN_IN_URL`**: 
- **`NEXT_PUBLIC_CLERK_SIGN_UP_URL`**: 
- **`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`**: 
- **`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`**: 
- **`UPLOADTHING_SECRET`**: Secret key for the Uploadthing service.
- **`UPLOADTHING_APP_ID`**: Application ID for Uploadthing.
- **`LIVEKIT_API_KEY`**: API key for Livekit.
- **`LIVEKIT_API_SECRET`**: Secret key for Livekit.
- **`NEXT_PUBLIC_LIVEKIT_URL`**: Base URL for Livekit's service.



## Attribution

- The project idea was inspired by [Code with Antonio](https://www.youtube.com/watch?v=ZbX4Ok9YX94).

## Planned Features

- [x] Real time Messaging
- [] End to End Encryption
- [] Send other things like videos and documents.
- [x] Emojis
- [x] Audio / video Calls
- [x] Add real time using socket-io
- [] Channels and servers


Feel free to contribute and enhance the project!
