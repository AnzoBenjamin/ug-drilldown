import Image from "next/image";

interface userCardProps {
  name: string;
  age: string | number;
  id: string;
  telephone: number;
  district: string;
  subcounty: string;
  parish: string;
}

export default function UserCard({
  name,
  age,
  id,
  telephone,
  district,
  subcounty,
  parish,
}: userCardProps) {
  return (
    <section>
      <div className="mb-8 bg-grey">
        <div className="g-2 flex items-center gap-4">
          <div>
            <Image src={"/ui-face1.jpg"} alt="image" width={100} height={100}/>
          </div>
          <div>
            <div>
              <h1>Name: {name}</h1>
              <p>Age: {age}</p>
              <p>ID: {id}</p>
              <p>Tel: {telephone}</p>
              <p>District: {district}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
