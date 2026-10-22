"use client";
import { useState } from "react";
import Image from 'next/image';
const organizations = {
 vnv: { name: 'AI V&V Lab', src: '/images/logos/vnv.png', url: 'https://ai-vnv.kfupm.io/' },
 oisl: { name: 'OISL', src: '/images/logos/oisl.png', url: 'https://oisl-website.pages.dev/' },
 pln: { name: 'PLN Batam', src: '/images/logos/pln-batam.png', url: 'https://www.plnbatam.com/' },
 umy: { name: 'Universitas Muhammadiyah Yogyakarta', src: 'https://www.umy.ac.id/wp-content/uploads/2025/01/Asset-61-2.png', url: 'https://www.umy.ac.id/' },
};
export default function OrganizationLogo({organization}:{organization:keyof typeof organizations}) {
 const org=organizations[organization];
 const [fallback,setFallback]=useState(false);
 return <a className={`organization-logo organization-logo-${organization}`} href={org.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${org.name}`}><Image unoptimized src={fallback && organization === "umy" ? "/images/logos/umy.webp" : org.src} onError={() => { if (organization === "umy") setFallback(true); }} alt={`${org.name} logo`} width={64} height={64}/></a>;
}

