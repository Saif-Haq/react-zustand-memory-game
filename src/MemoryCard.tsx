type MemoryCardProps = {
    image: string,
    isHidden: boolean,
    onPicClick: () => void;
}
const MemoryCard = ({ image, onPicClick, isHidden }: MemoryCardProps) => {

    return (
        <div>
            {isHidden && <div
                onClick={onPicClick}
                style={{
                    position: "absolute",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 1)",
                    width: 80,
                    height: 80,
                    marginLeft: 5,
                }}>
            </div>}

            <img
                width="80px"
                height="80px"
                src={image}
                style={{
                    display: "relative",
                    width: "80px",
                    height: "80px",
                    marginLeft: 5

                }}
            />
        </div>
    )
}

export default MemoryCard