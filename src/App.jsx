import { useState } from 'react'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Invoices from './pages/Invoices'
import NewInvoice from './pages/NewInvoice'
import Quotes from './pages/Quotes'
import NewQuoteTemplate from './pages/NewQuoteTemplate'
import Insights from './pages/Insights'
import DiscountRules from './pages/DiscountRules'
import ProfitabilityLayer from './pages/ProfitabilityLayer'
import NewFeatureWorkflows from './pages/NewFeatureWorkflows'
import { initialInvoices, initialQuotes, initialDiscountRules, initialServices } from './data/mockData'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [invoices, setInvoices] = useState(initialInvoices)
  const [quotes, setQuotes] = useState(initialQuotes)
  const [discountRules, setDiscountRules] = useState(initialDiscountRules)
  const [services, setServices] = useState(initialServices)

  const navigate = (p) => setPage(p)

  const addInvoice = (invoice) => {
    const nextNum = invoices.length + 1
    setInvoices(prev => [{
      ...invoice,
      id: nextNum,
      number: `#${nextNum}`,
    }, ...prev])
    navigate('invoices')
  }

  const addQuote = (quote) => {
    const nextNum = quotes.length + 1
    setQuotes(prev => [{
      ...quote,
      id: nextNum,
      number: `#${nextNum}`,
    }, ...prev])
    navigate('quotes')
  }

  const addDiscountRule = (rule) => {
    setDiscountRules(prev => [...prev, { ...rule, id: Date.now() }])
  }

  const updateDiscountRule = (id, updated) => {
    setDiscountRules(prev => prev.map(r => r.id === id ? updated : r))
  }

  const deleteDiscountRule = (id) => {
    setDiscountRules(prev => prev.filter(r => r.id !== id))
  }

  const updateService = (id, updated) => {
    setServices(prev => prev.map(s => s.id === id ? updated : s))
  }

  const addService = (svc) => {
    setServices(prev => [...prev, { ...svc, id: Date.now() }])
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard navigate={navigate} />
      case 'invoices':
        return <Invoices invoices={invoices} navigate={navigate} />
      case 'invoices/new':
        return (
          <NewInvoice
            navigate={navigate}
            addInvoice={addInvoice}
            discountRules={discountRules}
            services={services}
          />
        )
      case 'quotes':
        return <Quotes quotes={quotes} navigate={navigate} />
      case 'quotes/new-template':
        return <NewQuoteTemplate navigate={navigate} addQuote={addQuote} />
      case 'insights':
        return <Insights services={services} navigate={navigate} />
      case 'discount-rules':
        return (
          <DiscountRules
            discountRules={discountRules}
            addDiscountRule={addDiscountRule}
            updateDiscountRule={updateDiscountRule}
            deleteDiscountRule={deleteDiscountRule}
          />
        )
      case 'profitability-layer':
        return <ProfitabilityLayer services={services} updateService={updateService} addService={addService} />
      case 'feature-workflows':
        return <NewFeatureWorkflows navigate={navigate} />
      default:
        return <Dashboard navigate={navigate} />
    }
  }

  return (
    <AppShell page={page} navigate={navigate}>
      {renderPage()}
    </AppShell>
  )
}
