import { useEffect, useState } from "react";
import { getOpportunityByCodeApi } from "../services/opportunityApi";

export default function ApiTest() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function test() {
      try {
        const result = await getOpportunityByCodeApi("DZ-001");

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    }

    test();
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>جاري اختبار API...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        <h2>فشل الاتصال</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>API Test - DZ-001</h2>

      <pre
        style={{
          marginTop: 20,
          padding: 20,
          background: "#f5f5f5",
          overflow: "auto",
          direction: "ltr",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}