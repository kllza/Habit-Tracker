import SocialMediaLinks from "../../SocialMediaLinks/SocialMediaLinks";
import ContactInfo from "../../ContactInfo/ContactInfo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-8">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <SocialMediaLinks />
        <ContactInfo />
      </div>
    </footer>
  );
};

export default Footer;
