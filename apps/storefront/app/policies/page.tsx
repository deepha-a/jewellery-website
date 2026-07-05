import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { Mail, MapPin } from "lucide-react";

interface InfoItem {
  label: string;
  text: string;
}

interface RightCard {
  title: string;
  description: string;
}

export default function PrivacyPolicyPage() {
  const identityData: InfoItem[] = [
    { label: "Identity Data", text: "Full name, title, and date of birth for verification of eligibility for exclusive collections." },
    { label: "Contact Data", text: "Residential address, billing address, email address, and personal telephone number." },
    { label: "Transaction Data", text: "Details about payments to and from you and other details of products you have purchased from us." },
    { label: "Technical Data", text: "IP address, login data, browser type and version, time zone setting, and location for bespoke service optimization." },
  ];

  const usagePoints: string[] = [
    "Process and deliver your bespoke orders, including managing payments and fees.",
    "Manage our relationship with you, including notifying you about changes to our terms or privacy policy.",
    "Deliver relevant website content and advertisements to you and measure the effectiveness of the advertising.",
    "Improve our website, products/services, marketing, customer relationships, and experiences.",
  ];

  const rightsCards: RightCard[] = [
    { title: "Request Access", description: "Obtain a copy of the personal data we hold about you." },
    { title: "Request Correction", description: "Ensure any incomplete or inaccurate data is corrected." },
    { title: "Request Erasure", description: "Ask us to delete or remove personal data where there is no good reason for us to continue processing it." },
    { title: "Object to Processing", description: "Challenge our processing of your data for direct marketing purposes." },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-8 md:p-12 space-y-10">
          
          {/* Main Title Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#0F172A]">Privacy Policy</h1>
            <p className="text-xs text-gray-400 italic">Last Updated: June 2026</p>
            <div className="w-full h-[1px] bg-[#E2E8F0] pt-2 border-b border-[#E2E8F0]" />
          </div>

          {/* Section: Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F172A]">Information We Collect</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              At GlowDrape, we are committed to protecting the privacy of our distinguished clientele. We collect information that you provide directly to us when you interact with our luxury platform, including:
            </p>
            <ul className="space-y-3 pl-2 pt-2">
              {identityData.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-[#334155]">{item.label}: </strong>
                  {item.text}
                </li>
              ))}
            </ul>
          </section>

          {/* Section: How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F172A]">How We Use Your Information</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your data is handled with the same precision and care as our curated jewelry. We use your information to:
            </p>
            <ul className="space-y-3 pl-4 list-disc text-gray-600 marker:text-gray-400">
              {usagePoints.map((point, index) => (
                <li key={index} className="text-sm leading-relaxed pl-1">
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Cookies and Tracking */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">Cookies and Tracking Technologies</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              GlowDrape uses cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our digital showroom.
            </p>
          </section>

          {/* Section: Sharing of Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">Sharing of Information</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We do not sell, rent, or trade your personal information to third parties. We may share your personal data with internal high-level administrators and external service providers (such as secure payment gateways and logistics partners) who are bound by strict confidentiality agreements to assist in our operations.
            </p>
          </section>

          {/* Section: Data Security */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F172A]">Data Security</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is strictly limited to employees, agents, contractors, and other third parties who have a business &quot;need to know.&quot;
              </p>
            </div>
          </section>

          {/* Section: Your Rights */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F172A]">Your Rights</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {rightsCards.map((card, index) => (
                <div 
                  key={index} 
                  className="bg-[#F8FAFC] p-5 rounded-lg border-l-4 border-[#B48A36] space-y-1 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-[#0F172A]">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Contact Information */}
          <section className="space-y-4 pt-2">
            <h2 className="text-xl font-bold text-[#0F172A]">Contact Information</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy practices, please contact our Data Protection Officer at:
            </p>
            
            <div className="space-y-3 pt-2 pl-1">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#B48A36]" />
                <a href="mailto:privacy@glowdrape.com" className="text-[#B48A36] font-medium hover:underline">
                  privacy@glowdrape.com
                </a>
              </div>
              
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#B48A36] mt-0.5 flex-shrink-0" />
                <span className="leading-tight">1200 Luxury Plaza, Chennai, 600100, India</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}