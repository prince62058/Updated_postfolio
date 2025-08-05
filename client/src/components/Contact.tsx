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
    
    toast({
      title: "Sending your message...",
      description: "Please wait while I send your email.",
    });
    
    try {
      // Try multiple email services for direct sending
      const emailServices = [
        // EmailJS - Free email service for static sites
        {
          name: 'EmailJS',
          endpoint: 'https://api.emailjs.com/api/v1.0/email/send',
          payload: {
            service_id: 'service_portfolio',
            template_id: 'template_contact',
            user_id: 'user_portfolio_public_key',
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              to_email: 'princekumar5252@gmail.com',
              subject: formData.subject,
              message: formData.message,
              reply_to: formData.email
            }
          }
        },
        // Formspree - Another reliable service
        {
          name: 'Formspree',
          endpoint: 'https://formspree.io/f/mnnqgqpn',
          payload: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email
          }
        },
        // Web3Forms - Free service
        {
          name: 'Web3Forms',
          endpoint: 'https://api.web3forms.com/submit',
          payload: {
            access_key: '8f9c2e5d-4b7a-6c3e-9f1d-2a8b5c7e9f12', // Demo key
            name: formData.name,
            email: formData.email,
            subject: `Portfolio Contact: ${formData.subject}`,
            message: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
            from_name: formData.name,
            to: 'princekumar5252@gmail.com'
          }
        }
      ];

      let emailSent = false;

      // Try each service until one works
      for (const service of emailServices) {
        try {
          const response = await fetch(service.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(service.payload)
          });

          if (response.ok) {
            const result = await response.json();
            console.log(`${service.name} success:`, result);
            emailSent = true;
            break;
          }
        } catch (serviceError) {
          console.log(`${service.name} failed:`, serviceError);
          continue;
        }
      }

      if (emailSent) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your message. I've received your email and will get back to you soon!",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        // If all services fail, use a hybrid approach
        // Try to send via a simple POST to our own endpoint first
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              toast({
                title: "Message Sent Successfully!",
                description: "Thank you for your message. I've received your email and will get back to you soon!",
              });
              setFormData({ name: '', email: '', subject: '', message: '' });
              return;
            }
          }
        } catch (apiError) {
          console.log('Local API failed:', apiError);
        }

        // Final fallback - create a professional experience
        toast({
          title: "Alternative Contact Method",
          description: "Please email me directly at princekumar5252@gmail.com or call +916205872519",
        });

        // Store message locally for user reference
        const messageData = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString()
        };

        localStorage.setItem('portfolio_contact_backup', JSON.stringify(messageData));
        
        setFormData({ name: '', email: '', subject: '', message: '' });
      }

    } catch (error) {
      console.error('Contact form error:', error);
      
      toast({
        title: "Please Contact Directly",
        description: "Email: princekumar5252@gmail.com | Phone: +916205872519",
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
