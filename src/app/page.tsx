import WebPlan from "@/components/Home/WebPlan/WebPlan";
import SliderSection from "@/components/SliderSection/SliderSection";


function Home() {
  return (
    <div className="home">
      <div className="fix-height">
        <SliderSection />
        <h2 className="font-bold text-3xl text-center my-8">Choose Your Web Hosting Plan</h2>
        <div className="my-8 flex items-center justify-center gap-3">
          <WebPlan
            title={"Premuim"}
            text={"Every THing You Need To Create Your Website"}
            discount={11.9}
            saved={79}
            price={2.49}
          />
          <WebPlan
            title={"Business"}
            text={"Level-Up With More Power And Enhanced Features"}
            discount={13.99}
            saved={74}
            price={3.69}
          />
          <WebPlan
            title={"Cloud Startup"}
            text={"Enjoy Optimized Peformance & PowerFul Resources"}
            discount={24.99}
            saved={64}
            price={8.99}
          />
        </div>
      </div>
    </div>
  )
}
export default Home;