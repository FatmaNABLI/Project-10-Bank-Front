import Hero from "../../components/hero/Hero";
import iconChat from "../../assets/icon-chat.png"
import iconMoney from "../../assets/icon-money.png"
import iconSecurity from "../../assets/icon-security.png"
import FeatureItem2 from "../../components/featureItem/FeatureItem2";


function Home(){
    const featureItems=[
        {icone : iconChat, title : 'You are our #1 priority',content : 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'},
        {icone : iconMoney, title : 'More savings means higher rates',content : 'The more you save with us, the higher your interest rate will be!'},
        {icone : iconSecurity, title : 'Security you can trust',content : 'We use top of the line encryption to make sure your data and money is always safe.'}
    ]
    return(
        <div>
            <Hero/>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featureItems.map((item,index)=>
                    <FeatureItem2 key={`Feature-Item-${index}`} icone={item.icone} title={item.title} content={item.content}/>
                )}
            </section>
        </div>
    )
}
export default Home;