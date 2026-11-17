import { useEffect, useState } from "react";

interface Shoe {
  id: number;
  name: string;
  release: string;
  inStock: boolean;
}
export default function App() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  useEffect(() => {
    let ignore = false;
    (async () => {
      const data = await (await fetch('http://localhost:3000/shoes')).json() as Shoe[];
      if (!ignore) setShoes(data);
    })();
    return () => void (ignore = true);
  });

  return <div className="container">
    <div className="row">
      <div className="col">
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Release</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map(it => (
              <tr key={it.id}>
                <td>{it.name}</td>
                    <td>{new Date(it.release).toLocaleDateString()}</td>
                <td>{it.inStock ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <form></form>
      </div>
    </div>
  </div>
}
