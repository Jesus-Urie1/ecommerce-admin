import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  useEffect(() => {
    axios.get("/api/ordenes").then((res) => {
      setOrdenes(res.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Ordenes</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length > 0 &&
            ordenes.map((orden) => (
              <tr key={orden._id}>
                <td>{new Date(orden.createdAt).toLocaleString()}</td>
                <td className={orden.paid ? "text-green-600" : "text-red-600"}>
                  {orden.paid ? "Paid" : "Not paid"}{" "}
                </td>
                <td>
                  {orden.name} {orden.email}
                  <br />
                  {orden.city} {orden.postalCode}
                  {orden.country}
                  <br />
                  {orden.streetAddress}
                </td>
                <td>
                  {orden.line_items.map((line) => (
                    <>
                      {line.price_data?.product_data.name} x {line.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
