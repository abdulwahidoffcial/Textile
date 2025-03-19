


export default function DashboardsPage(){
    const [iframeLoaded, setIframeLoaded] = useState(false);
    return (
        <div className= "w-full h-[80vh]">
          {iframeLoaded && (
            <iframe
              src="https://lookerstudio.google.com/embed/reporting/5841aa92-4199-44fc-884f-2021b478a8f1/page/y2VAF"
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg shadow-lg"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      )
}