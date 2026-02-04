import AuthProvider, { useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoadingUser) return; // ✅ wait until auth state is ready

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      router.replace("/auth");
    } else if (user && inAuthGroup) {
      router.replace("/"); // or "/(tabs)"
    }
  }, [user, isLoadingUser, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth" />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
