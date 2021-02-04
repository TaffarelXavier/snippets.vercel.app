import { NextPage } from 'next';

interface Props {
  statusCode?: number | null | undefined;
  userAgent?:string
}

const Custom404: NextPage<Props> = ({ statusCode,userAgent }) => {
  return (
    <div>
      404 - Page Not Found
      <pre>{JSON.stringify(statusCode, null, 2)}</pre>
      <pre>{JSON.stringify(userAgent, null, 2)}</pre>
    </div>
  )
}

export default Custom404;
