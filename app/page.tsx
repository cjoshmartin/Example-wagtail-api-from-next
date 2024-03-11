import styles from "./page.module.css";

async function getBody() {
  const idUrl = "https://backend.cjoshmartin.com/api/pages/?type=home.HomePage&fields=_,id";
  const {id} = await fetch(idUrl, {
    next: {revalidate: 3600} // revalidate at most every hour
  })
  .then(r => r.json())
  .then(({items}:any)  => items[0]) 

  const bodyUrl = `https://backend.cjoshmartin.com/api/pages/${id}/?fields=_,body`
  const {body} = await fetch(bodyUrl, {
    next: {revalidate: 3600} // revalidate at most every hour
  })
  .then(r => r.json())

  return body
}

export default async function Home() {
  const body = await getBody();

  return (
    <main className={styles.main}>
      <h1>Data</h1>
      <div 
        dangerouslySetInnerHTML={{__html: body}} 
      />
    </main>
  );
}
