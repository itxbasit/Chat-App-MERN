

export default function SubAbout({about}){
    return(
        <div className="sub-about sub-about-height">
            <p className="heading sub-ab-heading">About</p>
            <p>{about ? about : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere cumque, assumenda quaerat, in ducimus nostrum provident corrupti fuga id sit iure aliquid soluta! Incidunt officiis neque qui praesentium odio beatae."}</p>
        </div>
    )
}