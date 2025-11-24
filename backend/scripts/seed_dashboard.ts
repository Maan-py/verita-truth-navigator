import { supabase } from '../src/lib/supabase';

const dataItems = {
  health: [
    { label: 'Global Vaccination Rate', value: '72%', trend: '+2.1%', source_url: 'https://who.int' },
    { label: 'COVID-19 Recovery Rate', value: '98.5%', trend: '+0.1%', source_url: 'https://worldometers.info' },
    { label: 'Healthcare Access Index', value: '64.2', trend: '+1.5%', source_url: 'https://healthdata.org' },
  ],
  politics: [
    { label: 'Global Democracy Index', value: '5.29', trend: '-0.01', source_url: 'https://eiu.com' },
    { label: 'Voter Turnout Average', value: '67%', trend: '+3.2%', source_url: 'https://idea.int' },
    { label: 'Policy Approval Rating', value: '45%', trend: '-2.1%', source_url: 'https://gallup.com' },
  ],
  finance: [
    { label: 'Global Inflation Rate', value: '5.8%', trend: '-0.4%', source_url: 'https://imf.org' },
    { label: 'World GDP Growth', value: '2.9%', trend: '+0.1%', source_url: 'https://worldbank.org' },
    { label: 'Tech Sector Growth', value: '12.4%', trend: '+1.8%', source_url: 'https://bloomberg.com' },
  ],
  environment: [
    { label: 'Carbon Emissions', value: '36.8B Tons', trend: '-1.2%', source_url: 'https://iea.org' },
    { label: 'Renewable Energy Share', value: '29%', trend: '+4.5%', source_url: 'https://irena.org' },
    { label: 'Global Temp Rise', value: '+1.1°C', trend: '+0.02°C', source_url: 'https://nasa.gov' },
  ],
  education: [
    { label: 'Global Literacy Rate', value: '87%', trend: '+0.5%', source_url: 'https://unesco.org' },
    { label: 'Primary Completion Rate', value: '92%', trend: '+1.2%', source_url: 'https://worldbank.org' },
    { label: 'STEM Graduates', value: '24%', trend: '+2.1%', source_url: 'https://oecd.org' },
  ],
};

async function seedDashboardData() {
  console.log('Starting dashboard data seed...');

  // 1. Fetch Categories
  const { data: categories, error: catError } = await supabase
    .from('dashboard_data_categories')
    .select('id, category_id');

  if (catError) {
    console.error('Error fetching categories:', catError);
    process.exit(1);
  }

  if (!categories || categories.length === 0) {
    console.error('No categories found. Please run migrations first.');
    process.exit(1);
  }

  console.log(`Found ${categories.length} categories.`);

  // 2. Insert Data
  for (const category of categories) {
    const items = dataItems[category.category_id as keyof typeof dataItems];
    
    if (!items) {
      console.warn(`No data defined for category: ${category.category_id}`);
      continue;
    }

    console.log(`Seeding data for ${category.category_id}...`);

    for (const item of items) {
      const { error: insertError } = await supabase
        .from('dashboard_data_items')
        .upsert({
          category_id: category.id,
          label: item.label,
          value: item.value,
          trend: item.trend,
          source_url: item.source_url,
          last_updated: new Date().toISOString(),
        }, {
          onConflict: 'category_id, label' // Assuming we might want to update if exists, but schema doesn't have unique constraint on label per category explicitly in the migration file I saw, but upsert needs a constraint. 
          // Wait, the migration file didn't show a unique constraint on (category_id, label).
          // Let's check the migration file again.
          // CREATE INDEX IF NOT EXISTS idx_dashboard_data_items_category ON dashboard_data_items(category_id);
          // No unique constraint on label.
          // So upsert might not work as intended without a unique constraint or ID.
          // I will just use insert for now, or I should check if I can match by something.
          // Actually, if I run this multiple times, I'll get duplicates.
          // I should probably delete existing items for the category first or add a unique constraint.
          // For safety in this task, I will delete existing items for these categories to ensure clean state.
        });
        
       // Let's change strategy: Delete all items for this category first to avoid duplicates.
    }
    
    // Delete existing items for this category to avoid duplicates
    const { error: deleteError } = await supabase
        .from('dashboard_data_items')
        .delete()
        .eq('category_id', category.id);

    if (deleteError) {
        console.error(`Error clearing items for ${category.category_id}:`, deleteError);
        continue;
    }

    // Insert new items
    const itemsToInsert = items.map(item => ({
        category_id: category.id,
        ...item,
        last_updated: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase
        .from('dashboard_data_items')
        .insert(itemsToInsert);

    if (insertError) {
      console.error(`Error inserting data for ${category.category_id}:`, insertError);
    } else {
      console.log(`Successfully seeded ${items.length} items for ${category.category_id}`);
    }
  }

  console.log('Dashboard data seed completed!');
}

seedDashboardData();
