"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("drop_feed")
        .select("*")
        .order("release_datetime_utc", { ascending: true })
        .limit(50);

      if (error) setErr(error.message);
      else setRows(data || []);
    })();
  }, []);

  return (
    <main>
      <h1>Upcoming Drops</h1>

      {err ? (
        <p style={{ color: "crimson" }}>Error: {err}</p>
      ) : null}

      <div style={{ marginTop: 12 }}>
        {rows.map((r) => (
          <div
            key={r.id ?? `${r.brand}-${r.release_datetime_utc}`}
            style={{
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 10
            }}
          >
            <div style={{ fontWeight: 700 }}>{r.brand ?? "Unknown brand"}</div>
            <div style={{ opacity: 0.8 }}>
              {r.release_datetime_utc ?? "No time"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
