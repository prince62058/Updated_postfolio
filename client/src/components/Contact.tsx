import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      if (titleRef.current) titleRef.current.style.opacity = '0';
      if (infoRef.current) infoRef.current.style.opacity = '0';
      if (formRef.current) formRef.current.style.opacity = '0';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Try serverless function first, then fallback to local server
      const endpoints = ['/api/contact', 'http://localhost:5000/api/contact'];
      let success = false;
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();

          if (result.success) {
            toast({
              title: "Message Sent Successfully!",
              description: result.emailSent 
                ? "Thank you for your message. I've received your email and will get back to you soon!"
                : "Thank you for your message. It has been saved and I'll get back to you soon!",
            });

            // Reset form
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: ''
            });
            success = true;
            break;
          }
        } catch (endpointError) {
          console.log(`Failed to reach ${endpoint}:`, endpointError);
          continue;
        }
      }

      if (!success) {
        throw new Error('All endpoints failed');
      }

    } catch (error) {
      // Fallback for static deployment - open email client
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(`Hi Prince,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`);
      const mailtoUrl = `mailto:princekumar5252@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(mailtoUrl, '_blank');
      
      toast({
        title: "Email Client Opened!",
        description: "Your default email app should open with the message pre-filled. Please send the email to complete your message.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: 'ph-envelope',
      label: 'Email',
      value: 'princekumar5252@gmail.com',
      href: 'mailto:princekumar5252@gmail.com'
    },
    {
      icon: 'ph-phone',
      label: 'Phone',
      value: '+916205872519',
      href: 'tel:+916205872519'
    },
    {
      icon: 'ph-map-pin',
      label: 'Location',
      value: 'Bhopal, Madhya Pradesh',
      href: null
    },
    {
      icon: 'ph-github-logo',
      label: 'GitHub',
      value: '@prince62058',
      href: 'https://github.com/prince62058'
    },
    {
      icon: 'ph-linkedin-logo',
      label: 'LinkedIn',
      value: '@prince62058',
      href: 'https://www.linkedin.com/in/prince62058/'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 
          ref={titleRef}
          className="contact-title text-3xl sm:text-4xl lg:text-5xl font-light text-center mb-12 sm:mb-16 text-accent"
        >
          Get In Touch
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="contact-info">
            <h3 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8 text-accent">Let's Connect</h3>
            <p className="text-muted-foreground mb-6 sm:mb-8 font-light text-sm sm:text-base">
              Whether you're looking for a developer, have a question about my projects, or just want to say hello, I'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="glassmorphic p-3 rounded-full">
                    <i className={`${item.icon} text-accent text-xl`}></i>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-foreground hover:text-accent transition-colors"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-foreground">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={formRef} className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input glassmorphic border-0 bg-transparent text-foreground placeholder-muted-foreground font-light"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input glassmorphic border-0 bg-transparent text-foreground placeholder-muted-foreground font-light"
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input glassmorphic border-0 bg-transparent text-foreground placeholder-muted-foreground font-light"
              />
              <Textarea
                name="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="form-input glassmorphic border-0 bg-transparent text-foreground placeholder-muted-foreground font-light resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-primary py-4 rounded-xl font-light hover:bg-secondary transition-all duration-300 btn-glow"
              >
                <i className="ph-paper-plane-tilt mr-2"></i>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
