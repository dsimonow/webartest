import { getImageUrl } from './utils.js';

function Profile({ person, size }) {
    var newArray = person.awards.join(', ');
    return (
        <section className="profile">
            <h2>{person.name}</h2>
            <img
                className="avatar"
                src={getImageUrl(person.imageId)}
                alt={person.name}
                width={size}
                height={size}
            />
            <ul>
                <li>
                    <b>Profession: </b>
                    {person.profession}
                </li>
                <li>
                    <b>Awards: {person.awards.length} </b>
                    ({newArray})
                </li>
                <li>
                    <b>Discovered: </b>
                    {person.discovery}
                </li>
            </ul>
        </section>
    )
}

export default function Gallery() {
    let persons =
        [
            {
                key: 0,
                name: 'Maria Skłodowska-Curie',
                profession: 'physicist and chemist',
                imageId: 'szV5sdG',
                awards: ['Nobel Prize in Physics',
                    'Nobel Prize in Chemistry',
                    'Davy Medal',
                    'Matteucci Medal'
                ],
                discovery: 'polonium (element)'
            },
            {
                key: 1,
                name: 'Katsuko Saruhashi',
                profession: 'geochemist',
                imageId: 'YfeOqp2',
                awards: ['Miyake Prize for geochemistry',
                    'Tanaka Prize'
                ],
                discovery: 'a method for measuring carbon dioxide in seawater'
            },
        ]

    const listItems = persons.map(person => <Profile person={person} size={70}> </Profile>);
    //const listItems = persons.map(person => <p>{person.name}</p>);
    return (
        <div>
            <h1>Notable Scientists</h1>
            {listItems}
        </div>
    );
}




import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
    var adSize = size > 89 ? 'b' : 's'
    return (
        <img
            className="avatar"
            src={getImageUrl(person, adSize)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}

export default function Profile() {
    return (
        <Avatar
            size={90}
            person={{
                name: 'Gregorio Y. Zara',
                imageId: '7vQD0fP'
            }}
        />
    );
}


