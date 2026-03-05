function HighlightText(props){
    const {text,color}=props
    return(
        <span className={`${color} fw-bold`}>
            {text}
        </span>
    )
}
export default HighlightText