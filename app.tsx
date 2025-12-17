import { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import { supabase } from "./lib/supabase";

export default function App() {
  const [drops, setDrops] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("drop_feed")
        .select("*")
        .order("release_datetime_utc", { ascending: true })
        .limit(50);

      if (error) setError(error.message);
      else setDrops(data ?? []);
    })();
  }, []);

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Upcoming Drops</Text>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <FlatList
        data={drops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontWeight: "700" }}>{item.brand ?? "Unknown brand"}</Text>
            <Text>{new Date(item.release_datetime_utc).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
