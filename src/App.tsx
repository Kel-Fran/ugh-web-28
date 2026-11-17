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
        <form onSubmit={e => {
            e.preventDefault();
            const data = new FormData(e.target);
            const name = data.get('name')!.toString();
            const release = new Date(data.get('release')).toISOString();
            const inStock = data.get('inStock') === 'on';
            fetch('http://localhost:3000/shoes', {
                method: 'POST',
                body: JSON.stringify({name, release, inStock})
            }).then(async _ => {
                e.target.reset();
                const data = await (await fetch('http://localhost:3000/shoes')).json() as Shoe[];
                setShoes(data);
            })
        }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" name="name" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="release" className="form-label">release</label>
                <input type="date" name="release" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="inStock" className="form-label">in stock</label>
                <input type="checkbox" name="inStock" className="check"/>
            </div>
            <div className="mb-3">
                <input type="submit"/>
            </div>
        </form>
      </div>
    </div>
  </div>
}
