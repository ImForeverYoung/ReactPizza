import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props: any) => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="120" r="120" /> 
    <rect x="0" y="339" rx="18" ry="18" width="280" height="87" /> 
    <rect x="0" y="292" rx="13" ry="13" width="280" height="27" />
  </ContentLoader>
)

export default Skeleton